import WhyImgURI from "@/assets/why.svg";
import Button from "@/components/ui/Button";
import NumberTicker from "@/components/ui/number-ticker";
import { axiosSecure } from "@/hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Why = () => {
  const fetchData = async () => {
    const { data } = await axiosSecure.get("/status/all");
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allStatus"],
    queryFn: fetchData,
  });

  return (
    <>
      <section className="flex justify-center">
        <div className="w-primary inline-flex flex-col md:flex-row items-center gap-10 px-5">
          <div className="w-full md:w-6/12 flex justify-center">
            <img
              data-aos="fade-up"
              width={550}
              src={WhyImgURI}
              alt="Why Donated Blood"
            />
          </div>
          <div data-aos="fade-down" className="w-full md:w-6/12">
            <h3 className="text-4xl font-semibold">Why Donate Blood?</h3>
            <span className="w-20 h-1 bg-red-500 flex my-5"></span>
            <p>
              Blood donation is one of the simplest yet most impactful ways to
              save lives. A single donation can help save up to three lives,
              making you a hero in someone's eyes. The need for blood is
              constant, and donations are required for surgeries, emergencies,
              cancer treatments, and many other medical conditions.
            </p>
            <div className="flex flex-wrap gap-5 items-center pt-5">
              <div>
                <h3 className={`text-3xl font-2 mt-2`}>
                  <NumberTicker value={data?.totalDonors || 0} />
                  {!data?.totalDonors && "0"}+
                </h3>
                <p className="font-2">Total donors</p>
              </div>
              <div>
                <h3 className={`text-3xl font-2 mt-2`}>
                  <NumberTicker value={data?.totalDonationReqDone || 0} />
                  {!data?.totalDonationReqDone && "0"}+
                </h3>
                <p className="font-2">Blood donated</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Why;
