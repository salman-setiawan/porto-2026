/**
 * ProjectMeta
 *
 * Reusable metadata grid for project detail pages.
 * Renders a 2-column layout: Role | Duration  /  Type | Tools
 *
 * Props
 * ─────
 * data   {object}  Project data object with { role, duration, type, tools }
 *                  Each field: role.en, duration.en, type.en, tools: string[]
 */
const ProjectMeta = ({ data }) => {
  return (
    <div className="space-y-4 w-full">
      {/* Row 1: Role | Duration */}
      <div className="flex gap-4 w-full">
        <div className="space-y-1 text-[14px] w-full">
          <p className="text-app-muted">Role :</p>
          <p className="font-medium text-app-primary">{data.role.en}</p>
        </div>
        <div className="space-y-1 text-[14px] w-full">
          <p className="text-app-muted">Duration :</p>
          <p className="font-medium text-app-primary">{data.duration.en}</p>
        </div>
      </div>

      {/* Row 2: Type | Tools */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="space-y-1 text-[14px] w-full">
          <p className="text-app-muted">Type :</p>
          <p className="font-medium text-app-primary">{data.type.en}</p>
        </div>
        <div className="space-y-1 text-[14px] w-full">
          <p className="text-app-muted">Tools :</p>
          <p className="font-medium text-app-primary">{data.tools.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectMeta

