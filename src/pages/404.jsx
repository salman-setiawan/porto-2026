const NotFound = () => {
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex gap-x-4 md:gap-x-6 lg:gap-x-8 font-bold text-[160px] md:text-[200px] lg:text-[320px] xl:text-[444px] text-[#ffaa50]">
          <div className="float-anim">4</div>
          <div className="float-anim-2">0</div>
          <div className="float-anim-3">4</div>
        </div>
        <div className='px-24 text-center'>i-can't-find-the-page-or-link-that-u-requested-sorry</div>
      </div>
    </div>
  )
}

export default NotFound