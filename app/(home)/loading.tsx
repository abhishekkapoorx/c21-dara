import { Progress } from "@heroui/progress"

function Loading() {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <Progress
        size="sm"
        isIndeterminate
        color="warning"
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  )
}

export default Loading