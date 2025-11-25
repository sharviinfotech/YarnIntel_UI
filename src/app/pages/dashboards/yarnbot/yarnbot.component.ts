import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-yarnbot',
  templateUrl: './yarnbot.component.html',
  styleUrls: ['./yarnbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class YarnbotComponent {
  year = new Date().getFullYear();
  isChatOpen = true; // Chat always visible
  userMessage = '';
  messages: { from: string, text: string }[] = [];
  isTyping = false;

  constructor() {}

  // Send Message
  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add user message
    this.messages.push({
      from: 'user',
      text: this.userMessage
    });

    const userText = this.userMessage;
    this.userMessage = '';

    // Show typing dots
    this.isTyping = true;

    // Simulate bot reply delay
    setTimeout(() => {
      this.isTyping = false;
      this.messages.push({
        from: 'bot',
        text: this.getBotReply(userText)
      });
    }, 800);
  }

  // Default Bot Reply
  getBotReply(message: string): string {
    return "👋 Hello! I received your message: " + message;
  }

  // Optional: close button
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
