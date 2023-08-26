/* eslint-disable @typescript-eslint/no-explicit-any */
import ListUser from "./components/ListUsers";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./utils/UserSlice";
import { AppDispatch } from "./store/store";
import Loading from "./components/Loading";

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
            <Loading />
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
