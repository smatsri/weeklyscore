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

    const result = await runResult(
      ['publish', ['correlationId', 'command']],
      ['set-result', ['correlationId', 'result']]
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('completed');
  });

  it("after set result multiple times should be completed-multiple", async () => {
    const result = await runResult(
      ['publish', { value: "command" }],
      ['set-result', 'result-1'],
      ['set-result', 'result-2'],
    );

    expect(result).toBeDefined();
    expect(result.type).toBe('completed-multiple');
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

});
