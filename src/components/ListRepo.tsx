/* eslint-disable @typescript-eslint/no-explicit-any */
const ListRepo = (props: any) => {
  return (
    <div className="py-2 flex justify-between border-b border-gray-400">
      <div>
        <a
          href={props.repo.html_url}
          className="font-semibold text-base"
          target="blank"
        >
          {props.repo.name}
        </a>
        <p className="text-sm text-gray-800">{props.repo.full_name}</p>
        <p className="text-sm text-gray-800 max-w-[90%]">
          <span className="font-semibold">Descriptions :</span>{" "}
          {props.repo.description ? props.repo.description : " -"}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-semibold text-gray-800">
          {props.repo.stargazers_count}
        </p>
        <span className="material-icons text-xl">star</span>
      </div>
    </div>
  );
};

export default ListRepo;
