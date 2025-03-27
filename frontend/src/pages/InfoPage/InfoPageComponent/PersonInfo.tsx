import { Avatar, Link } from "@heroui/react";
import { PersonInformationSchema } from "../infoPageUtils";
import { FC } from "react";

type PersonInfoProps = {
  person: PersonInformationSchema;
};

export const PersonInfo: FC<PersonInfoProps> = ({ person }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 lg:gap-5">
      <Avatar src={person.avatar} alt={person.name} size="lg" />
      <Link
        className="text-main-default text-2xl"
        href={person.profile}
        target="_blank"
      >
        {person.name}
      </Link>
      <p>{person.description}</p>
    </div>
  );
};
