export function LoadingSlideRecent() {
  return (
    <div className="w-[250px] h-[250px] skeleton rounded-xl"/>
  )
}

export function LoadingItemRecent() {
  return (
    <div
    className="flex justify-between items-center"
  >
    <div className="flex gap-3 pt-4">
      <div className="w-11 h-11 rounded-lg skeleton">
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-16 h-5 skeleton">
          
        </div>
        <div className="w-10 h-3 skeleton">
          
        </div>
      </div>
    </div>
    <div className="w-8 h-5 skeleton"/>
  </div>
  )
}