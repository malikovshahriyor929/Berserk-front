'use client';

import { useMemo, useState, useCallback } from 'react';
import WidgetCard from '@core/components/cards/widget-card';
import { Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import DropdownAction from '@core/components/charts/dropdown-action';
import type { AtRiskStudent } from './at-risk-data';

const RISK_COLORS = ['#EF4444', '#F59E0B', '#10B981']; // Red, Amber, Green

const viewOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Monthly', label: 'Monthly' },
];

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, outerRadius, startAngle, endAngle, midAngle } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 100) * cos;
    const sy = cy + (outerRadius - 100) * sin;
    return (
        <Sector
            cx={sx}
            cy={sy}
            cornerRadius={5}
            innerRadius={50}
            outerRadius={120}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={props.fill}
        />
    );
};

export default function StudentsByRiskLevelChart({
                                                     className,
                                                     students,
                                                 }: {
    className?: string;
    students: AtRiskStudent[];
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const distribution = useMemo(() => {
        const high = students.filter((s) => s.riskLevel === 'high').length;
        const medium = students.filter((s) => s.riskLevel === 'medium').length;
        const low = students.filter((s) => s.riskLevel === 'low').length;
        return [
            { name: 'High Risk', value: high },
            { name: 'Medium Risk', value: medium },
            { name: 'Low Risk', value: low },
        ];
    }, [students]);

    const total = useMemo(
        () => distribution.reduce((acc, d) => acc + d.value, 0),
        [distribution]
    );

    const onMouseOver = useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, []);

    const onMouseLeave = useCallback(() => {
        setActiveIndex(-1);
    }, []);

    function handleChange(viewType: string) {
        console.log('Selected:', viewType);
    }

    return (
        <WidgetCard
            title="Students by Risk Level"
            titleClassName="text-gray-800 sm:text-lg font-inter"
            headerClassName="items-center"
            className={cn('@container', className)}
            description={
                <div className="text-sm text-gray-500">
                    Number of students in each risk category
                </div>
            }
            action={
                <DropdownAction
                    className="rounded-lg border"
                    options={viewOptions}
                    onChange={handleChange}
                />
            }
        >
            <div className="h-full items-start gap-4 @sm:flex mt-8">
                <div className="relative h-[300px] w-full after:absolute after:inset-1/2 after:h-20 after:w-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-gray-300 @sm:w-3/5 @sm:py-3 rtl:after:translate-x-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                data={distribution}
                                cornerRadius={10}
                                innerRadius={55}
                                outerRadius={100}
                                paddingAngle={5}
                                stroke="rgba(0,0,0,0)"
                                dataKey="value"
                                activeShape={renderActiveShape}
                                onMouseOver={onMouseOver}
                                onMouseLeave={onMouseLeave}
                            >
                                {distribution.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={RISK_COLORS[index % RISK_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="@sm:w-2/5 @sm:ps-2">
                    <div className="mb-4 mt-1">
                        <div className="mb-1.5 text-gray-700">Total Students</div>
                        <Title as="h2" className="font-inter font-bold text-gray-900">
                            {total}
                        </Title>
                    </div>
                    <div>
                        {distribution.map((item, index) => (
                            <Detail
                                key={index}
                                color={RISK_COLORS[index % RISK_COLORS.length]}
                                value={((item.value / total) * 100).toFixed(1)}
                                text={item.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </WidgetCard>
    );
}

function Detail({
                    color,
                    value,
                    text,
                }: {
    color: string;
    value: string | number;
    text: string;
}) {
    return (
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 py-3 last:border-b-0">
            <div className="col-span-3 flex items-center gap-1.5">
                <span style={{ background: color }} className="block h-3 w-3 rounded" />
                <p className="text-gray-500">{text}</p>
            </div>
            <span
                style={{ borderColor: color }}
                className="rounded-full border-2 px-2 font-semibold text-gray-700"
            >
        {value}%
      </span>
        </div>
    );
}
