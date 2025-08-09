type Props = {
    leftArrow: {
        isActive: boolean
    },
    rightArrow: {
        isActive: boolean
    }
}

export default function NavigationArrows({leftArrow, rightArrow}: Props) {
    const inactiveIconClass = "text-gray-200 dark:text-gray-800 w-6 h-6";
    const activeIconClass = "text-gray-800 dark:text-gray-200 w-6 h-6 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 duration-150";
    const leftArrowIcon = 
        <svg className={leftArrow.isActive ? activeIconClass : inactiveIconClass} xmlns="http://www.w3.org/2000/svg" fill={"currentColor"} viewBox="0 0 24 24">
            <path d="M11.79 6.29 6.09 12l5.7 5.71 1.42-1.42L9.91 13H18v-2H9.91l3.3-3.29z"></path>
        </svg>
    const rightArrowIcon = 
        <svg className={rightArrow.isActive ? activeIconClass : inactiveIconClass} xmlns="http://www.w3.org/2000/svg" fill={"currentColor"} viewBox="0 0 24 24">
            <path d="M6 13h8.09l-3.3 3.29 1.42 1.42 5.7-5.71-5.7-5.71-1.42 1.42 3.3 3.29H6z"></path>
        </svg>
    return (
        <div className="flex items-center justify-between">
            <button
                className=""
                disabled={!leftArrow.isActive}
            >
                {leftArrowIcon}
            </button>
            <button
                className=""
                disabled={!rightArrow.isActive}
            >
                {rightArrowIcon}
            </button>
        </div>
    )
}