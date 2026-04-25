import React, { useState, useRef, useEffect } from 'react';
import {
  PiPaperPlaneTiltBold,
  PiXBold,
  PiUploadSimpleBold,
  PiFileBold,
  PiTrashBold,
  PiFireSimpleBold,
  PiClockBold,
  PiSnowflakeBold,
  PiChatTextFill,
  PiPaperclipBold,
  PiArrowRightBold,
  PiInfoBold,
  PiXCircleBold,
} from 'react-icons/pi';
import {
  Button,
  Input,
  MultiSelect,
  AdvancedCheckbox,
  Text,
  Avatar,
  Popover,
  Box,
  Badge,
} from 'rizzui';
import cn from '@core/utils/class-names';

interface ContactFormProps {
  onSubmit: (formData: any) => void;
  isSubmitting: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: Date;
  attachments?: File[];
}

// Custom Tab component
const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'border-b-2 px-4 py-2 font-medium outline-none',
      active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700'
    )}
  >
    {children}
  </button>
);

// Custom Card component
const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Box
    className={cn(
      'rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-100/50',
      className
    )}
  >
    {children}
  </Box>
);

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  // Request type and priority states
  const [priority, setPriority] = useState('medium');
  const [requestTypes, setRequestTypes] = useState(['technical-issue']);
  const [showSettings, setShowSettings] = useState(true);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Request type options for MultiSelect
  const requestTypeOptions = [
    { label: 'Technical Issue', value: 'technical-issue' },
    { label: 'Account Problem', value: 'account-problem' },
    { label: 'Feature Request', value: 'feature-request' },
    { label: 'Data Question', value: 'data-question' },
    { label: 'Billing Question', value: 'billing-question' },
    { label: 'Feedback', value: 'feedback' },
    { label: 'Other', value: 'other' },
  ];

  // Format time for chat messages
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Scroll to bottom of messages on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle priority change
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle sending chat message
  const handleSendMessage = () => {
    if (inputMessage.trim() || attachments.length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: inputMessage.trim(),
        timestamp: new Date(),
        attachments: attachments.length > 0 ? [...attachments] : undefined,
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
      setAttachments([]);

      // Simulate support response after a delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          text: `Thank you for contacting support about your ${requestTypes[0]} issue. An agent will assist you shortly.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 1000);
    }
  };

  // Handle key press for sending message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-200">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <PiChatTextFill className="h-5 w-5" />
          </div>
          <div>
            <Text
              as="strong"
              className="text-lg font-semibold text-gray-800 dark:text-blue-500"
            >
              Live Support Chat
            </Text>
            <p className="text-sm text-gray-500 dark:text-gray-600">
              Chat directly with our support team
            </p>
          </div>
        </div>
        <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Support Available
        </div>
      </div>

      {/* Request Settings */}
      <div
        className={`border-b border-gray-200 bg-gray-50 transition-all duration-300 dark:border-gray-200 dark:bg-gray-200/10 ${showSettings ? 'max-h-96 overflow-y-auto p-4' : 'max-h-0 overflow-hidden p-0'}`}
      >
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <Text
              as="p"
              className="text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Request Type
            </Text>
          </div>
          <MultiSelect
            value={requestTypes}
            options={requestTypeOptions}
            onChange={(value: string[]) => setRequestTypes(value)}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <Text
              as="p"
              className="text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Priority Level
            </Text>
          </div>
          <div className="flex flex-wrap gap-3">
            <AdvancedCheckbox
              name="priority"
              value="low"
              alignment="center"
              className={cn(
                'transition-all duration-200',
                priority === 'low'
                  ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-600 dark:bg-cyan-900/20'
                  : 'hover:border-cyan-200 hover:bg-cyan-50/50 dark:hover:border-cyan-800/30 dark:hover:bg-cyan-900/10'
              )}
              inputClassName="[&:checked:enabled~span]:border-cyan-500 [&:checked:enabled~span]:ring-cyan-500"
              checked={priority === 'low'}
              onChange={() => handlePriorityChange('low')}
            >
              <div className="flex flex-col items-center gap-1 py-1">
                <PiSnowflakeBold className="h-5 w-5 text-cyan-600 dark:text-cyan-500" />
                <span className="font-medium text-cyan-700 dark:text-cyan-500">
                  Low
                </span>
                <span className="text-xs text-cyan-600 dark:text-cyan-400">
                  Non-urgent
                </span>
              </div>
            </AdvancedCheckbox>

            <AdvancedCheckbox
              name="priority"
              value="medium"
              alignment="center"
              className={cn(
                'transition-all duration-200',
                priority === 'medium'
                  ? 'border-amber-500 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/20'
                  : 'hover:border-amber-200 hover:bg-amber-50/50 dark:hover:border-amber-800/30 dark:hover:bg-amber-900/10'
              )}
              inputClassName="[&:checked:enabled~span]:border-amber-500 [&:checked:enabled~span]:ring-amber-500"
              checked={priority === 'medium'}
              onChange={() => handlePriorityChange('medium')}
            >
              <div className="flex flex-col items-center gap-1 py-1">
                <PiClockBold className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                <span className="font-medium text-amber-700 dark:text-amber-500">
                  Medium
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  Standard
                </span>
              </div>
            </AdvancedCheckbox>

            <AdvancedCheckbox
              name="priority"
              value="high"
              alignment="center"
              className={cn(
                'transition-all duration-200',
                priority === 'high'
                  ? 'border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
                  : 'hover:border-red-200 hover:bg-red-50/50 dark:hover:border-red-800/30 dark:hover:bg-red-900/10'
              )}
              inputClassName="[&:checked:enabled~span]:border-red-500 [&:checked:enabled~span]:ring-red-500"
              checked={priority === 'high'}
              onChange={() => handlePriorityChange('high')}
            >
              <div className="flex flex-col items-center gap-1 py-1">
                <PiFireSimpleBold className="h-5 w-5 text-red-600 dark:text-red-500" />
                <span className="font-medium text-red-700 dark:text-red-500">
                  High
                </span>
                <span className="text-xs text-red-600 dark:text-red-400">
                  Urgent
                </span>
              </div>
            </AdvancedCheckbox>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-200">
        <Button
          variant="text"
          size="sm"
          className="flex items-center gap-1 text-blue-600 dark:text-blue-500"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
          <span
            className={`transition-transform duration-200 ${showSettings ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </Button>
        <div className={`flex items-center gap-1 text-xs text-gray-500`}>
          <span className="flex flex-wrap gap-1 font-normal">
            {requestTypes.map((type) => {
              const option = requestTypeOptions.find(
                (opt) => opt.value === type
              );
              return (
                <Badge
                  size="sm"
                  key={type}
                  variant="flat"
                  color="secondary"
                  className="px-2 py-1.5"
                >
                  {option?.label}
                </Badge>
              );
            })}
          </span>
          <span className="text-blue-500">•</span>
          <span
            className={`${
              priority === 'low'
                ? 'text-cyan-600 dark:text-cyan-500'
                : priority === 'medium'
                  ? 'text-amber-600 dark:text-amber-500'
                  : 'text-red-600 dark:text-red-500'
            }`}
          >
            {priority === 'low'
              ? 'Low'
              : priority === 'medium'
                ? 'Medium'
                : 'High'}{' '}
            priority
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-4"
        style={{ minHeight: '350px', maxHeight: '350px' }}
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <PiChatTextFill className="mx-auto mb-3 h-12 w-12 text-gray-400" />
              <Text className="text-gray-500 dark:text-gray-400">
                Start a conversation with our support team
              </Text>
              <Text className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                Please describe your issue and we&apos;ll connect you with an
                agent
              </Text>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.sender === 'user' ? (
                  // User message - aligned right
                  <div className="flex justify-end">
                    <div className="flex max-w-[80%] flex-col items-end">
                      <div className="rounded-lg rounded-tr-none bg-blue-600 p-3 text-white dark:bg-blue-700">
                        {message.text}

                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center rounded-md bg-blue-700/50 px-2 py-1 text-sm"
                                >
                                  <PiFileBold className="mr-1 h-3.5 w-3.5" />
                                  <span className="truncate">{file.name}</span>
                                  <span className="ml-1 text-xs">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    <Avatar
                      name="You"
                      src="/images/avatar/user-01.png"
                      className="ml-2 flex-shrink-0"
                    />
                  </div>
                ) : (
                  // Support message - aligned left
                  <div className="flex justify-start">
                    <Avatar
                      name="Support Team"
                      src="/images/avatar/support-agent.png"
                      className="mr-2 flex-shrink-0"
                    />
                    <div className="flex max-w-[80%] flex-col items-start">
                      <div className="rounded-lg rounded-tl-none bg-gray-100 p-3 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200">
                        {message.text}

                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center rounded-md bg-gray-200/80 px-2 py-1 text-sm dark:bg-gray-600/50"
                                >
                                  <PiFileBold className="mr-1 h-3.5 w-3.5" />
                                  <span className="truncate">{file.name}</span>
                                  <span className="ml-1 text-xs">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="max-h-24 overflow-y-auto border-t border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-300 dark:bg-gray-100/30">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center rounded-md border border-gray-200 bg-white p-1 text-sm dark:border-gray-200 dark:bg-gray-100/30"
              >
                <PiFileBold className="mr-1 h-3.5 w-3.5 text-blue-600" />
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="ml-1 rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <PiXCircleBold className="h-3.5 w-3.5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t border-gray-200 p-4 dark:border-gray-400">
        <label htmlFor="chat-file-upload" className="cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-300/80">
            <PiPaperclipBold className="h-5 w-5" />
          </div>
          <input
            id="chat-file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <Input
          type="text"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 placeholder:text-gray-500"
        />
        <Button
          type="button"
          size="md"
          className="bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() && attachments.length === 0}
        >
          <PiPaperPlaneTiltBold className="h-4 w-4" />
          <span className="ml-2">Send</span>
        </Button>
      </div>
    </Card>
  );
};

export default ContactForm;
