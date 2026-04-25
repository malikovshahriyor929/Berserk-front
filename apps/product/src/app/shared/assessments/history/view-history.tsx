'use client';

import {
    Avatar,
    Badge,
    Button,
    Text,
    Title,
    Textarea,
} from 'rizzui';
import { PiPaperclipBold } from 'react-icons/pi';

type Props = {
    request: {
        student: { avatar: string; name: string; id: string };
        category: string;
        date: string;
        from: number;
        to: number;
        reason: string;
        status: string;
        attachment?: boolean;
    };
};

const categories = [
    { id: 'sat', name: 'SAT' },
    { id: 'ielts', name: 'IELTS' },
    { id: 'volunteering', name: 'Volunteering' },
    { id: 'extraCourses', name: 'Extra Courses' },
    { id: 'olympiads', name: 'Olympiads' },
    { id: 'projects', name: 'Projects' },
    { id: 'sports', name: 'Sports' },
    { id: 'arts', name: 'Arts' },
    { id: 'hackathons', name: 'Hackathons' },
    { id: 'exchanges', name: 'Exchanges' },
];

export default function RubricChangeRequestReview({ request }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'danger';
            default: return 'info';
        }
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="m-auto px-7 pt-6 pb-8 space-y-6 [&_label>span]:font-medium">
            <div className="flex items-center gap-3">
                <Avatar src={request.student.avatar} name={request.student.name} />
                <div>
                    <div className="font-medium text-gray-900">{request.student.name}</div>
                    <div className="text-xs text-gray-500">ID: {request.student.id}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <Text className="text-xs text-gray-500">Category</Text>
                    <Text>{categories.find((c) => c.id === request.category)?.name}</Text>
                </div>
                <div>
                    <Text className="text-xs text-gray-500">Date</Text>
                    <Text>{request.date}</Text>
                </div>
                <div>
                    <Text className="text-xs text-gray-500">From Score</Text>
                    <Text>{request.from}</Text>
                </div>
                <div>
                    <Text className="text-xs text-gray-500">To Score</Text>
                    <Text>{request.to}</Text>
                </div>
            </div>

            <div>
                <Text className="text-xs text-gray-500">Reason</Text>
                <Text>{request.reason}</Text>
            </div>

            {request.attachment && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PiPaperclipBold className="h-4 w-4 text-gray-500" />
                    <span>Attached file: <a className="underline cursor-pointer">Certificate.pdf</a></span>
                </div>
            )}

            <div className="flex items-center gap-2">
                <Text className="text-xs text-gray-500">Status</Text>
                <Badge color={getStatusColor(request.status)}>{capitalize(request.status)}</Badge>
            </div>

            {request.status === 'pending' && (
                <>
                    <Textarea
                        label="Admin Comment"
                        placeholder="Write your comment here before approving or rejecting..."
                        rows={3}
                    />
                    <div className="flex justify-end gap-3 pt-3">
                        <Button variant="outline" color="danger">Reject</Button>
                        <Button className="bg-mainBlue text-white">Approve</Button>
                    </div>
                </>
            )}
        </div>
    );
}



