/* eslint-disable @typescript-eslint/no-explicit-any */
import ListUser from "./components/ListUsers";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./utils/UserSlice";
import { AppDispatch } from "./store/store";

function App() {
  // destruct initialState from reducer
  const { users, isLoading } = useSelector((state: any) => state.users);
  // set useDispatch
  const dispatch = useDispatch<AppDispatch>();
  // state Accordion
  const [selected, setSelected] = useState(null);
  // state Query
  const [query, setQuery] = useState("");

  // function togle Accordion
  const togle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  // function handle submit Query
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate input form
    if (query === "") return;
    // disptatch get Users by Query
    dispatch(getUsers(query));
  };

  return (
    <>
      <div className="w-full bg-slate-200 flex items-center justify-center">
        <div className="flex flex-col w-full md:w-[800px] h-screen overflow-auto bg-white justify-start items-start px-4 md:px-16 md:pt-[30px] py-[30px] gap-2">
          <p className="text-xl md:text-2xl font-semibold mb-2">
            GitHub Repositories Explorer
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <div className="relative">
              <input
                type="text"
                className="bg-gray-100 px-4 py-3 w-full rounded-md outline-none"
                placeholder="Search Username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute top-[12px] right-[17px]">
                <span className="material-icons text-xl text-gray-800">
                  search
                </span>
              </div>
            </div>
            <button className="bg-blue-400 text-white w-full py-3 rounded-md">
              Search
            </button>
          </form>

          {/* Query results */}
          {query && (
            <p className="text-base font-semibold text-gray-500 py-3">
              Results for {`"${query}"`}
            </p>
          )}

          {/* Results Users by Query */}
          {isLoading ? (
            <div className="flex justify-center w-full h-full items-start pt-[20px]">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            users &&
            users.map((user: any, i: number) => {
              return (
                <ListUser
                  key={i}
                  togle={() => togle(i)}
                  user={user}
                  selected={selected}
                  index={i}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
