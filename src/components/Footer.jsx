export default function Footer() {
  return (
    <footer className="border-t border-ink/5 py-8 sm:py-10">
      <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row sm:gap-4 sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[10px] font-bold text-white sm:h-7 sm:w-7 sm:text-xs">D</span>
          <span className="font-semibold text-ink">dayemon.studio</span>
        </div>
        <div className="text-center sm:text-left">© {new Date().getFullYear()} · Сделано с любовью в Blender + React</div>
      </div>
    </footer>
  )
}
