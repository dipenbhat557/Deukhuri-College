import { motion } from "framer-motion";
import { styles } from "../../../3d-portfolio/src/styles";
import { staggerContainer } from "../../../3d-portfolio/src/utils/motion";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Component />
      </motion.section>
    );
  };
export default SectionWrapper;
