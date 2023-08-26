/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import axios from "axios";
import ListRepo from "./ListRepo";

type ListUserProps = {
  togle: any;
  user: any;
  selected: any;
  index: number;
};

const ListUser = (props: ListUserProps) => {
  // state repositories user
  const [repo, setRepo] = useState([]);

  // useEffect fetch data repositories user
  useEffect(() => {
    getRepos();
  }, []);

  // function fetch data repositories user
  const getRepos = async () => {
    const response = await axios.get(props.user.repos_url);

    setRepo(response.data);
  };

  return (
    <>
      <div className="w-full ">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-gray-200 rounded-md">
          <div className="flex items-center space-x-3">
            <img
              src={props.user.avatar_url}
              alt=""
              className="w-10 h-10 rounded-full bg-gray-800"
            />
            <a
              href={props.user.html_url}
              className="text-xl font-semibold cursor-pointer"
              target="blank"
            >
              {props.user.login}
            </a>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => props.togle(props.index)}
          >
            {props.selected === props.index ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`px-4 w-full bg-gray-100 ${
          props.selected === props.index ? "" : "max-h-0 overflow-hidden"
        }`}
      >
        <p className="font-semibold text-gray-800 py-3">Repositories</p>
        {repo.map((repo, i) => {
          return <ListRepo key={i} repo={repo} />;
        })}
      </div>
    </>
  );
};

export default ListUser;
