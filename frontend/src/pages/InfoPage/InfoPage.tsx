import { Avatar, Link } from "@heroui/react";
import { informations } from "./infoPageUtils";

export const InfoPage = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <header className="p-3">
        <p className="text-center text-main-default text-4xl">Informacje</p>
      </header>
      <div className="bg-white p-4 border-y-8 border-main-default w-full" />
      <div className="flex-1 w-3/4 mx-auto my-7 flex flex-col gap-10">
        <section className="flex flex-col gap-5">
          <h3 className="text-2xl text-main-default text-center">
            O aplikacji:
          </h3>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, in
            ipsam minima velit modi quis expedita dolor ullam aperiam eum quasi.
            Aspernatur ex neque quod, cumque magnam autem quae. Ducimus. Ipsam,
            aliquid consequatur. Voluptatibus dolor commodi cupiditate,
            distinctio, repellendus explicabo perspiciatis itaque ea et
            suscipit, non quasi earum ipsam excepturi voluptate alias ipsa animi
            quos minima accusantium reiciendis harum laboriosam! A blanditiis
            hic explicabo aspernatur perspiciatis laboriosam unde esse sint et,
            odio voluptatibus inventore vero veritatis distinctio deserunt dolor
            quam ratione dolore sunt error temporibus quasi ad! Molestiae,
            consequuntur eaque. Quis amet quisquam aspernatur, nostrum
            distinctio mollitia vel, suscipit velit temporibus incidunt aperiam!
            Tenetur dolorem rerum provident quia harum nam quo consequuntur
            dignissimos voluptate, officiis, nobis qui magni commodi ea!
            Mollitia quasi non molestias numquam fugit nisi suscipit odit
            doloribus reiciendis laudantium? Soluta dolorum ducimus possimus
            quas laborum laudantium ea fugiat aperiam facilis officia libero
            saepe, nisi provident consequatur voluptatem.
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <h3 className="text-2xl text-main-default text-center">
            Sposób użycia:
          </h3>
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, in
            ipsam minima velit modi quis expedita dolor ullam aperiam eum quasi.
            Aspernatur ex neque quod, cumque magnam autem quae. Ducimus. Ipsam,
            aliquid consequatur. Voluptatibus dolor commodi cupiditate,
            distinctio, repellendus explicabo perspiciatis itaque ea et
            suscipit, non quasi earum ipsam excepturi voluptate alias ipsa animi
            quos minima accusantium reiciendis harum laboriosam! A blanditiis
            hic explicabo aspernatur perspiciatis laboriosam unde esse sint et,
            odio voluptatibus inventore vero veritatis distinctio deserunt dolor
            quam ratione dolore sunt error temporibus quasi ad! Molestiae,
            consequuntur eaque. Quis amet quisquam aspernatur, nostrum
            distinctio mollitia vel, suscipit velit temporibus incidunt aperiam!
            Tenetur dolorem rerum provident quia harum nam quo consequuntur
            dignissimos voluptate, officiis, nobis qui magni commodi ea!
            Mollitia quasi non molestias numquam fugit nisi suscipit odit
            doloribus reiciendis laudantium? Soluta dolorum ducimus possimus
            quas laborum laudantium ea fugiat aperiam facilis officia libero
            saepe, nisi provident consequatur voluptatem.
          </div>
        </section>
        <section className="flex flex-col gap-5">
          <h3 className="text-2xl text-main-default text-center">
            Przymusowo zaangażowani:
          </h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-5">
            {informations.map((person) => (
              <div className="flex flex-col justify-center items-center gap-5">
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
            ))}
          </div>
        </section>
      </div>
      <div className="bg-white p-4 border-y-8 border-main-default w-full" />
      <div>
        <p className="text-white font-bold text-center p-3">
          Mechanik OG full gangsta © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
