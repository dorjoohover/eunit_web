const Engage = ({ view, date, num }: { view: any; date: any; num: any }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-sm md:text-[14px] font-bold">
      <div className="lg:flex-col">
        <p className="mr-[10px]">Зарын огноо: {date}</p>
        <p>Зарын дугаар: {num}</p>
      </div>
      {view}
    </div>
  );
};

export default Engage;
