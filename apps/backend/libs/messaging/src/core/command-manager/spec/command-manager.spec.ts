import { describe, expect, it } from '@jest/globals';
import { runResult } from './helpers';

describe('result', () => {

  it('after publish should be pending', async () => {

    const result = await runResult(
      ['publish', ['correlationId', 'command']]
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('still-pending');
  });

  it('after set result should be completed', async () => {

    const result = await runResult<string, string>(
      ['publish', 'command'],
      ['set-result', 'result']
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('completed');
    if (result.type !== 'completed') return;
    expect(result.result).toBe('result');
  });

  it("after set result multiple times should be completed-multiple", async () => {
    const result = await runResult(
      ['publish', { value: "command" }],
      ['set-result', 'result-1'],
      ['set-result', 'result-2'],
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('completed-multiple');
    if (result.type !== 'completed-multiple') return;

    expect(result.results).toEqual(['result-1', 'result-2']);

  });

  it("after clear should be not-found", async () => {
    const result = await runResult<string, string>(
      ['publish', { value: "command" }],
      ['set-result', 'result-1'],
      ['clear'],
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('not-found');

  });

  it('cannot set result before publish', async () => {
    const result = await runResult<string, string>(
      ['set-result', 'result'],
      ['publish', 'command'],
    );

    expect(result.type).toBe('still-pending');
  });

  it('cannot set result without publish', async () => {
    const result = await runResult<string, string>(
      ['set-result', 'result']
    );

    expect(result.type).toBe('not-found');
  });

});
