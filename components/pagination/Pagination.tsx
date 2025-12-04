
type PaginationProps = {
  page: number;
  setPage: (value: number) => void;
};
const Pagination = ({ page, setPage }: PaginationProps) => {
    const scrollToWithOffset = (id: string, offset: number) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };
    return(
        <div className="flex gap-3 mt-5 align-center justify-center mb-[20px]">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            scrollToWithOffset("product-top", 70);
          }}
          className="px-4 py-2 rounded-lg border 
      bg-white 
      hover:bg-gray-100 
      disabled:opacity-40 
      disabled:cursor-not-allowed 
      cursor-pointer
      transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold text-blue-600 bg-blue-50 rounded-lg">{page}</span>
        <button
          onClick={() => {
            setPage(page + 1);
            scrollToWithOffset("product-top", 70);
          }}
          className="px-4 py-2 rounded-lg border 
      bg-white 
      hover:bg-gray-100 
      disabled:opacity-40 
      disabled:cursor-not-allowed 
      cursor-pointer
      transition"
        >
          Next
        </button>
      </div>
    )
}
export default Pagination;