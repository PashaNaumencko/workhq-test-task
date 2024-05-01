import Image from "next/image"
import Avatar from '@/images/avatar1.png'
import LocationIcon from '@/images/location.svg'
import CloseIcon from '@/images/close.svg'
import CompanyLogo from '@/images/logo1.png'
import { Candidate } from "@/helpers/get-candidates"
import { memo } from "react"
import { calculateDateRange } from "@/helpers/calculate-date-range"
import { getYearsOfExperience } from "@/helpers/get-years-of-experience"

type Props = {
  item: Candidate
  onRemoveItem: (item: Candidate) => () => void;
}

export const CandidateCard = memo<Props>(({ item, onRemoveItem }) => {
  const workHistoryDateEntries = item.workHistory.map(historyItem => [new Date(historyItem.startDate), new Date(historyItem.endDate)]);

  return(
    <div className="flex flex-col rounded-md border border-solid border-[#DFE5E9] py-4">
      <div className="flex flex-row-reverse justify-between items-center px-[16px] pb-4 border-b border-b-solid border-b-[#DFE5E9]">
        <Image src={CloseIcon} alt="close icon" width={20} height={20} className="cursor-pointer" onClick={onRemoveItem(item)} />
      </div>
      <div className="flex justify-between items-center py-[12px] px-[16px]">
        <div className="flex gap-4">
          <Image src={Avatar} alt="avatar" width={62} height={62} className="rounded-md" />
          <div className="flex flex-col justify-center gap-2">
            <h4 className="text-[#10151B] font-bold leading-4 text-[22px]">{item.firstName} {item.lastName}</h4>
            <div className="flex items-center gap-1">
              <Image src={LocationIcon} alt="location icon" width={16} height={16} />
              <span className="text-[#7E899C] font-medium text-[14px] leading-2">{item.location}</span>
            </div>            
          </div>
        </div>

        <div className="rounded-[4px] w-[120px] flex flex-col gap-2 items-center py-3 px-4 border border-solid border-[#DFE5E9] [background:linear-gradient(91.09deg,#FEFDF7_21.48%,#F8FBFA_83.61%)]">
          <h5 className="font-semibold leading-2 text-[12px] text-[#1D2939]">Experience</h5>
          <div className="flex  gap-1">
            <h4 className="text-[#10151B] font-bold leading-4 text-[22px]">{getYearsOfExperience(workHistoryDateEntries)}</h4>
            <span className="font-regular text-[12px] leading-[1.7]">years</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pb-[12px] px-[16px]">
        <span className="text-[#7E899C] font-semibold text-[12px] leading-2">Work History · {item.workHistory.length}</span>
        <hr className="flex-1" />
      </div>

      <div className="flex flex-col gap-2 px-[16px]">
        {item.workHistory.map((historyItem) => (
          <div key={historyItem.company} className="flex items-center gap-1">
            <Image src={CompanyLogo} alt="company logo" width={20} height={20}  />
            <span className="leading-2 font-medium text-[14px] text=[#10151B]">{historyItem.company}</span>
            <span className="text-[#7E899C] font-bold text-[14px] leading-2">·</span>
            <span className="leading-2 font-medium text-[14px] text=[#10151B]">{historyItem.title}</span>
            <span className="text-[#9CA3AF] font-semibold text-[12px] leading-2">{calculateDateRange(new Date(historyItem.endDate), new Date(historyItem.startDate))}</span>
          </div>
        ))}
      </div>
    </div>
  )
});

CandidateCard.displayName = 'CandidateCard';
