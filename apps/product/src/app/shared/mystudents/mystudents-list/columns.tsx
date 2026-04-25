'use client';

import { routes } from '@/config/routes';
import AvatarCard from '@core/ui/avatar-card';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, ActionIcon, Tooltip, Progressbar } from 'rizzui';
import { Link } from '@/i18n/routing';
import {
    PiEyeBold,
    PiChatCenteredText,
    PiClipboardText,
} from 'react-icons/pi';

export interface StudentData {
    id: string;
    name: string;
    studentId: string;
    avatar: string;
    ielts?: {
        score?: number;
        preparationPercent: number;
    };
    sat?: {
        math?: number;
        english?: number;
        preparationPercent: number;
    };
    portfolioPercent: number;
    totalPoints: number;
}

const columnHelper = createColumnHelper<StudentData>();

function getProgressColor(percent: number) {
    if (percent >= 80) return 'success';
    if (percent >= 50) return 'warning';
    return 'danger';
}
const handleMessageStudent = (student: StudentData) => {
    console.log('Message:', student);
};

const handleAssignTask = (student: StudentData) => {
    console.log('Assign Task to:', student);
};


export const studentListColumns = [
    columnHelper.accessor('name', {
        id: 'name',
        size: 250,
        header: 'Student',
        cell: ({ row }) => (
            <AvatarCard
                src={row.original.avatar}
                name={row.original.name}
                description={`ID-${row.original.studentId}`}
            />
        ),
    }),

    columnHelper.accessor(row => row.ielts?.score ?? null, {
        id: 'ieltsScore',
        header: 'IELTS Score',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <Text className="text-sm">
                    {row.original.ielts?.score ?? `${row.original.ielts?.preparationPercent}% ready`}
                </Text>
                <Progressbar
                    value={row.original.ielts?.preparationPercent ?? 0}
                    size="sm"
                    color={getProgressColor(row.original.ielts?.preparationPercent ?? 0)}
                />
            </div>
        ),
    }),

    columnHelper.accessor(row => row.sat?.math ?? null, {
        id: 'satMath',
        header: 'SAT Math',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <Text className="text-sm">
                    {row.original.sat?.math ?? `${row.original.sat?.preparationPercent}% ready`}
                </Text>
                <Progressbar
                    value={row.original.sat?.preparationPercent ?? 0}
                    size="sm"
                    color={getProgressColor(row.original.sat?.preparationPercent ?? 0)}
                />
            </div>
        ),
    }),

    columnHelper.accessor(row => row.sat?.english ?? null, {
        id: 'satEnglish',
        header: 'SAT English',
        cell: ({ row }) => (
            <div className="flex flex-col">
                <Text className="text-sm">
                    {row.original.sat?.english ?? `${row.original.sat?.preparationPercent}% ready`}
                </Text>
                <Progressbar
                    value={row.original.sat?.preparationPercent ?? 0}
                    size="sm"
                    color={getProgressColor(row.original.sat?.preparationPercent ?? 0)}
                />
            </div>
        ),
    }),

    columnHelper.accessor('portfolioPercent', {
        id: 'portfolioPercent',
        header: 'Portfolio',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Text className="text-sm">{row.original.portfolioPercent}%</Text>
                <Progressbar
                    value={row.original.portfolioPercent}
                    size="sm"
                    color={getProgressColor(row.original.portfolioPercent)}
                />
            </div>
        ),
    }),

    columnHelper.accessor('totalPoints', {
        id: 'totalPoints',
        header: 'Total Points',
        enableSorting: true,
        cell: ({ row }) => (
            <Text className="font-semibold text-gray-800">
                {row.original.totalPoints}
            </Text>
        ),
    }),

    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Tooltip content="View Profile">
                    <Link href={routes.myStudents.details(row.original.id)}>
                        <ActionIcon size="sm" variant="outline">
                            <PiEyeBold className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>

                <Tooltip content="Message Student">
                    <Link href="#">
                        <ActionIcon size="sm" variant="outline">
                            <PiChatCenteredText className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>

                <Tooltip content="Assign Task">
                    <Link href="#">
                        <ActionIcon size="sm" variant="outline">
                            <PiClipboardText className="h-4 w-4" />
                        </ActionIcon>
                    </Link>
                </Tooltip>
            </div>
        ),
    }),

];
