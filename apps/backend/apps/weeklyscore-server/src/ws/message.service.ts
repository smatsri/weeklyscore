import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  async processMessage(userId: string, content: string): Promise<void> {
    // Example: Save message to a database or perform other logic
    console.log(`Processing message from ${userId}: ${content}`);

    // Add additional logic here as needed
  }
}
