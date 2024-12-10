export const CustomInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => (
  <input
    {...props}
    className="h-8 rounded-xl ml-4 border-solid border-2 border-slate-400"
  />
)
