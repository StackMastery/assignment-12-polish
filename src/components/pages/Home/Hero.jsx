import HeroBgURI from "@/assets/herobg.svg";
import Button from "@/components/ui/Button";
import LineBrack from "@/components/ui/LineBrack";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { TfiClose } from "react-icons/tfi";
import { AnimatePresence, motion } from "motion/react";
import SelectDistrictAndUpazila from "@/components/ui/SelectDistrictAndUpazila";

const Hero = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedDisAndUp, setselectedDisAndUp] = useState();
  const [bloodGroupe, setbloodGroupe] = useState();
  const naviagate = useNavigate();

  const SearchDonor = (e) => {
    e.preventDefault();

    if (
      !selectedDisAndUp?.district?.value ||
      !selectedDisAndUp?.upazila?.value ||
      !bloodGroupe
    ) {
      toast.error("Select all fields");
      return;
    }

    naviagate(
      `./donor/search?district=${selectedDisAndUp?.district?.value}&upazila=${selectedDisAndUp?.upazila?.value}&bloodGroupe=${bloodGroupe}`
    );
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center fixed items-center w-full h-screen px-5 bg-black/30 z-[999999999999]"
          >
            <motion.form
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              onSubmit={SearchDonor}
              className="bg-white/90 dark:bg-slate-900/20 backdrop-blur-2xl border-white border dark:border-white/10 dark:text-white p-10 h-fit rounded-xl w-full md:w-[500px]"
            >
              <div className="flex justify-end -mt-7 translate-x-7">
                <button
                  onClick={() => setisModalOpen(false)}
                  type="button"
                  className="bg-white/60 dark:bg-slate-800 p-2 rounded-md"
                >
                  <TfiClose size={20} />
                </button>
              </div>
              <div className="w-full flex gap-2 flex-wrap sm:flex-nowrap">
                <SelectDistrictAndUpazila setData={setselectedDisAndUp} />
              </div>
              <div className="w-full pt-5">
                <label className="block mb-1 font-medium dark:text-white/80 text-neutral-800">
                  Select Blood groupe
                </label>
                <span className="w-10 h-[1px] bg-red-600/40 flex mb-[10px] rounded-full"></span>
                <Select onValueChange={(e) => setbloodGroupe(e)}>
                  <SelectTrigger className="w-full bg-white/40">
                    <SelectValue placeholder="Blood groupe" />
                  </SelectTrigger>
                  <SelectContent className="z-[999999999999999]">
                    <SelectItem value="A%2B">A+</SelectItem>
                    <SelectItem value="A%2D">A-</SelectItem>
                    <SelectItem value="B%2B">B+</SelectItem>
                    <SelectItem value="B%2D">B-</SelectItem>
                    <SelectItem value="AB%2B">AB+</SelectItem>
                    <SelectItem value="O%2B">O+</SelectItem>
                    <SelectItem value="O%2D">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  className={`w-full mt-5 bg-red-500 dark:border-red-500 text-white`}
                >
                  Search
                </Button>
              </div>
            </motion.form>
          </motion.section>
        )}
      </AnimatePresence>
      <section
        style={{ backgroundImage: `url('${HeroBgURI}')` }}
        className="flex bg-contain xl:bg-[length:1500px_700px] bg-bottom bg-no-repeat justify-center"
      >
        <div className="inline-flex text-center xl:pb-80 px-5 py-40 h-[700px] md:h-[1000px] flex-col items-center w-full bg-gradient-to-b from-transparent via-transparent dark:to-slate-900 to-[#f9f1ef]">
          <div
            data-aos="fade-up"
            className="pt-10 flex flex-col items-center gap-5 z-10"
          >
            <div className="w-fit px-5 py-[2px] border dark:bg-red-500/20 bg-red-200/20 border-red-500/50 text-red-500 rounded-full">
              Every drop saves lives <span className="animate-pulse">❤️</span>
            </div>
            <h2 className="text-4xl font-semibold">
              Join the Lifesaving
              <LineBrack /> Mission with Red Bank
            </h2>
            <p>
              Be a hero today. Red Bank connects donors with those in need,
              making every drop of <LineBrack /> blood count. Join us in saving
              lives and building a stronger, healthier community.
              <LineBrack /> Your donation can make a world of difference.
            </p>
            <div className="flex justify-center gap-5 flex-wrap sm:flex-nowrap">
              <Link to={"/dashboard"}>
                <Button className={`bg-red-500 dark:border-red-500 text-white`}>
                  Join as a donor
                </Button>
              </Link>
              <button
                onClick={() => setisModalOpen(true)}
                className="flex items-center gap-3 border px-5 py-2 dark:bg-white/10 rounded-xl border-black/5 bg-black/5 group"
              >
                Search Donors
                <CiSearch size={20} />
              </button>
            </div>
          </div>
          <div className="w-full h-80 p-40 blur-xl flex absolute dark:bg-slate-900/80 bg-primary-1/80 z-0"></div>
        </div>
      </section>
    </>
  );
};

export default Hero;
