import dummy from "@/dummy";
import { useEffect, useState } from "react";
import { Billdetail, Dummy } from "@/types/dummy";

function Filter() {
  const [filterOne, setFilterOne] = useState<Dummy | undefined>();
  const [filterTwo, setFilterTwo] = useState<Billdetail[]>([]);
  const [filterThree, setFilterThree] = useState<number[]>([]);

  useEffect(() => {
    const filter = dummy.data.response.billdetails.filter(
      (val) => val.body.DENOM >= 100000
    );
    setFilterOne({
      ...dummy,
      data: {
        ...dummy.data,
        response: {
          ...dummy.data.response,
          billdetails: filter,
        },
      },
    });
    setFilterTwo(filter);
    setFilterThree(filter.map((val) => val.body.DENOM));
  }, []);

  return (
    <main className="px-6 md:px-12 pt-24 pb-8 flex flex-col gap-y-6">
      <section>
        <h1 className="font-bold text-foreground text-xl mb-2">
          Data yang belum di filter
        </h1>
        <p>{JSON.stringify(dummy, null, 4)}</p>
      </section>
      <section>
        <h1 className="font-bold text-foreground text-xl mb-2">
          Data yang sudah di filter (ditampilkan semua data)
        </h1>
        <p>{JSON.stringify(filterOne, null, 4)}</p>
      </section>
      <section>
        <h1 className="font-bold text-foreground text-xl mb-2">
          Data yang sudah di filter (ditampilkan data di billdetails)
        </h1>
        <p>{JSON.stringify(filterTwo, null, 4)}</p>
      </section>
      <section>
        <h1 className="font-bold text-foreground text-xl mb-2">
          Data yang sudah di filter (ditampilkan denomnya saja)
        </h1>
        <p>{JSON.stringify(filterThree, null, 4)}</p>
      </section>
    </main>
  );
}

export default Filter;
