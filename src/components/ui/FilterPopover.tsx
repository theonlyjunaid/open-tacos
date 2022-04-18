import LeanPopover from './LeanPopver'
import MobileFilterPopover from './MobileFilterPopover'
interface FilterPopoverProps {
  label: string
  shortHeader: string
  header: string
  children: JSX.Element | JSX.Element[]
  onApply?: Function
  minMax?: JSX.Element
  isMobile?: boolean
}
/**
 * Base popover component for crag finder filter bar
 * @param FilterPopoverProps
 * @returns
 */
export default function FilterPopover ({ label, header, shortHeader, children, onApply, minMax, isMobile = true }: FilterPopoverProps): JSX.Element {
  if (isMobile) {
    return (
      <MobileFilterPopover btnLabel={label} title={shortHeader} onApply={onApply}>
        <MobileFilterPopover.ContentPanel>
          {minMax}
          {children}
        </MobileFilterPopover.ContentPanel>
      </MobileFilterPopover>
    )
  }
  return (
    <LeanPopover
      btnClz='border-2 rounded-2xl btn-small border-neutral-100 lg:text-neutral-100 flex flex-row space-x-1.5 center-items'
      btnLabel={label}
    >
      <LeanPopover.ContentPanel
        className='relative mt-2 p-6 bg-white rounded-md lg:drop-shadow-md lg:min-w-[400px] w-full'
        onApply={onApply}
      >
        <header className='mb-8'>{header}</header>
        <div className=''>{children}</div>
        {minMax}
      </LeanPopover.ContentPanel>
    </LeanPopover>
  )
}

interface MinMaxProps {
  min: string
  max: string
}

export const MinMax = ({ min, max }: MinMaxProps): JSX.Element => {
  return (
    <div className='mt-6 max-w-screen-sm px-4 mx-auto flex justify-between text-sm'>
      <div className='flex flex-col items-center'>
        <div className='text-secondary text-xs'>Min</div>
        <div className='pt-1 text-primary border-t-2 border-slate-400'>{min}</div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='text-secondary text-xs'>Max</div>
        <div className='pt-1 text-primary border-t-2 border-slate-400'>{max}</div>
      </div>
    </div>
  )
}