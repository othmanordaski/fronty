import React from 'react';
import { Badge } from "@/components/ui/badge"

export function BadgeManage({ status }) {
    let badgeContent;

    switch (status) {
        case 'pending':
            badgeContent = <Badge className='py-[5px] px-[12px] w-30 rounded-xl bg-yellow-100 text-yellow-500 border-yellow-500' variant="outline">Pending</Badge>;
            break;
        case 'completed':
            badgeContent = <Badge className='py-[5px] px-[12px] rounded-xl bg-green-100 text-green-500 border-green-500' variant="outline">Completed</Badge>;
            break;
        case 'rejected':
            badgeContent = <Badge className='py-[4px] px-[8px] rounded-xl bg-red-500' variant="outline">Rejected</Badge>;
            break;
        default:
            badgeContent = <Badge className='py-[10px] px-[8px] rounded-xl bg-gray-500' variant="outline">Default</Badge>;
            break;
    }

    return <div className="badge-container">{badgeContent}</div>;
};
