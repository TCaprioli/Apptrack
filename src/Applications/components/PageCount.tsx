import { useEffect } from "react"
import { APPLICATIONS_PER_PAGE } from "../constants"

type PageCountProps = {
  page: number
  totalItems: number
  increment: () => void
  decrement: () => void
}

export const PageCount = (props: PageCountProps) => {
  useEffect(() => {
    // Maximum number of items that can be paginated.
    const maxItems = APPLICATIONS_PER_PAGE * props.page - APPLICATIONS_PER_PAGE
    if (
      props.totalItems > 0 &&
      props.page !== 1 &&
      props.totalItems === maxItems
    ) {
      props.decrement()
    }
  }, [props])
  return (
    <div className="flex flex-row items-center">
      <button
        className="disabled:border-none disabled:text-gray-500"
        disabled={props.page === 1}
        onClick={props.decrement}
      >
        {"<"}
      </button>
      <span>{props.page}</span>
      <button
        className="disabled:border-none disabled:text-gray-500"
        disabled={props.totalItems <= APPLICATIONS_PER_PAGE * props.page}
        onClick={props.increment}
      >
        {">"}
      </button>
    </div>
  )
}
