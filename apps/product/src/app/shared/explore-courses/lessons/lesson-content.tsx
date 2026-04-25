'use client';

import { useState } from 'react';
import { Lesson } from '@core/types';
import { Badge, Button, Input, Textarea } from 'rizzui';
import {
  PiBookmark,
  PiCheck,
  PiClock,
  PiFile,
  PiFilePdf,
  PiFilePdfBold,
  PiNote,
  PiPlay,
  PiRepeat,
  PiSpeakerHigh,
  PiSpeakerSlash,
} from 'react-icons/pi';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ProductReviewForm from '../../ecommerce/product/product-review-form';
import LessonReviewForm from './lesson-review-form';
import Rate from '@core/ui/rate';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [comment, setComment] = useState('');

  const handleMarkComplete = () => {
    toast.success('Lesson marked as completed!');
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast.success('Comment submitted successfully!');
      setComment('');
    }
  };

  const renderVideoPlayer = () => (
    <div className="group relative mb-6 aspect-video overflow-hidden rounded-lg bg-black">
      {lesson.videoUrl ? (
        <video
          src={lesson.videoUrl}
          className="h-full w-full object-cover"
          poster="/images/video-placeholder.jpg"
          controls
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <Image
            src="/images/video-placeholder.jpg"
            alt={lesson.title}
            width={800}
            height={450}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="solid"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-mainBlue text-white"
            >
              <PiPlay className="h-8 w-8" />
            </Button>
          </div>
        </div>
      )}

      {/* Video Controls */}
      {/* <div className="absolute bottom-0 left-0 right-0 hidden items-center justify-between bg-gradient-to-t from-mainBlue to-mainBlue/10 p-3 text-white transition-transform duration-200 group-hover:flex">
        <div className="flex items-center gap-4">
          <span className="text-sm">05:42</span>
          <Button variant="text" className="p-0 text-white">
            <PiPlay className="h-6 w-6" />
          </Button>
          <Button variant="text" className="p-0 text-white">
            <PiRepeat className="h-6 w-6" />
          </Button>
          <Button variant="text" className="p-0 text-white">
            <PiSpeakerHigh className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">01:13:00</span>
          <Button variant="text" className="p-0 text-white">
            <PiClock className="h-6 w-6" />
          </Button>
          <Button variant="text" className="p-0 text-white">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            </svg>
          </Button>
        </div>
      </div> */}
    </div>
  );

  const renderPdfViewer = () => (
    <div className="relative mb-6 flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
      <div className="p-8 text-center">
        <PiFile className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-mainBlue">{lesson.title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {lesson.topics?.length} chapters · {lesson.duration} minutes
        </p>
        <Button
          variant="solid"
          className="mt-4 bg-mainBlue text-white"
          onClick={() => toast.success('PDF opened!')}
        >
          Open PDF
        </Button>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-mainBlue/20">
      {/* Content Header */}
      <div className="flex items-center gap-3 px-6 pt-6">
        <div className="rounded-lg bg-mainBlue/20 p-1 text-mainBlue">
          <PiBookmark className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold text-mainBlue dark:text-gray-700 lg:text-2xl">
          {lesson.title}
        </h2>
      </div>

      {/* Video/PDF Display */}
      <div className="p-6">
        {lesson.type === 'video' ? renderVideoPlayer() : renderPdfViewer()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 px-6 pb-4">
        <Button
          variant="outline"
          className="flex items-center border-mainBlue text-mainBlue"
          onClick={() => toast.success('Practice mode activated!')}
        >
          <PiNote className="mr-2 h-5 w-5" />
          Practice this course
        </Button>

        <Button
          variant="outline"
          className="flex items-center border-green text-green hover:!border-green hover:!text-green"
          onClick={handleMarkComplete}
        >
          <PiCheck className="mr-2 h-5 w-5" />
          Mark as completed
        </Button>
      </div>

      {/* Content Tabs */}
      <div>
        <div className="flex border-b border-gray-200">
          <Button
            variant="text"
            className={`rounded-none px-6 py-4 ${
              activeTab === 'overview'
                ? 'border-b-2 border-mainBlue text-mainBlue'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="flex items-center gap-2">
              Overview
              {activeTab !== 'overview' && (
                <Badge size="sm" variant="solid" color="danger">
                  1
                </Badge>
              )}
            </span>
          </Button>
          <Button
            variant="text"
            className={`rounded-none px-6 py-4 ${
              activeTab === 'files'
                ? 'border-b-2 border-mainBlue text-mainBlue'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('files')}
          >
            <span className="flex items-center gap-2">
              <span>Files</span>
              {activeTab !== 'files' && (
                <Badge size="sm" variant="solid" color="danger">
                  3
                </Badge>
              )}
            </span>
          </Button>
          <Button
            variant="text"
            className={`rounded-none px-6 py-4 ${
              activeTab === 'notes'
                ? 'border-b-2 border-mainBlue text-mainBlue'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            <span className="flex items-center gap-2">
              Notes
              {activeTab !== 'notes' && (
                <Badge size="sm" variant="solid" color="danger">
                  6
                </Badge>
              )}
            </span>
          </Button>
          <Button
            variant="text"
            className={`rounded-none px-6 py-4 ${
              activeTab === 'comments'
                ? 'border-b-2 border-mainBlue text-mainBlue'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('comments')}
          >
            <span className="flex items-center gap-2">
              Comments
              {activeTab !== 'comments' && (
                <Badge size="sm" variant="solid" color="danger">
                  2
                </Badge>
              )}
            </span>
          </Button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <p className="text-gray-700">{lesson.description}</p>

              {/* Sample UCAT explanation text */}
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold">
                  UCAT Chapter {lesson.id} notes
                </h3>
                <div className="mb-4 flex items-center text-sm text-gray-500">
                  <PiClock className="mr-1 h-4 w-4" />
                  <span>12:23:00</span>
                  <span className="mx-2">•</span>
                  <span>Oct 09, 2024</span>
                </div>
                <p className="mb-4 text-gray-700">
                  The University Clinical Aptitude Test (UCAT) is an exam used
                  in the application process for most medical and dental schools
                  in the UK. This entrance test is used to distinguish between
                  otherwise similarly accomplished applicants to ensure that the
                  best are invited to interview for a spot on the aforementioned
                  prestigious courses.
                </p>
                <p className="text-gray-700">
                  The University Clinical Aptitude Test (UCAT) is an exam used
                  in the application process for most medical and dental schools
                  in the UK. This entrance test is used to distinguish between
                  otherwise similarly accomplished applicants to ensure that the
                  best are invited to interview for a spot on the aforementioned
                  prestigious courses.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-mainBlue/20 p-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <PiFilePdf className="mr-3 h-8 w-8 text-mainBlue" />
                  <div>
                    <p className="font-medium">{lesson.title} - Handout.pdf</p>
                    <p className="text-sm text-gray-500">
                      2.4 MB • Added Oct 9, 2024
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success('File downloaded!')}
                >
                  Download
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-mainBlue/20 p-4">
                <div className="mb-2 flex justify-between">
                  <h5 className="font-medium">UCAT Verbal Reasoning Note</h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <PiClock className="mr-1 h-4 w-4" />
                    <span>Oct 09, 2024</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  Focus on timing - aim for approximately 30 seconds per
                  question. Practice by setting strict time limits.
                </p>
              </div>

              <div className="rounded-lg border border-mainBlue/20 p-4">
                <div className="mb-2 flex justify-between">
                  <h5 className="font-medium">
                    Key Verbal Reasoning Techniques
                  </h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <PiClock className="mr-1 h-4 w-4" />
                    <span>Oct 08, 2024</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  Remember to focus on what&apos;s explicitly stated in the
                  text, not what you already know about the topic. Watch out for
                  extreme language.
                </p>
              </div>

              <form className="rounded-lg border border-mainBlue/20 p-4">
                <Input
                  label="Add a new note"
                  placeholder="Type your note here..."
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="solid"
                    className="bg-mainBlue text-white"
                    onClick={() => toast.success('Note added!')}
                  >
                    Add Note
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-mainBlue/20 p-4 dark:border-gray-200">
                <div className="flex items-start gap-3">
                  <Image
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-12.webp"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className='flex items-center gap-4'>
                        <h5 className="font-medium">Sarah Johnson</h5>
                        <Rate size="sm" value={4} disabled />
                      </div>
                      <div className="text-sm text-gray-600">3 days ago</div>
                    </div>
                    <p className="mt-1 text-gray-700">
                      I found the strategy for True, False, Can&apos;t Tell
                      questions very helpful. Does anyone have additional
                      practice resources?
                    </p>
                  </div>
                </div>
              </div>

              <LessonReviewForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
