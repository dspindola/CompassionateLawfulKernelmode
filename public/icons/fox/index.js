import fox1 from "./1.svg";
import fox2 from "./2.svg";
import fox3 from "./3.svg";
import fox4 from "./4.svg";
import fox5 from "./5.svg";
import fox6 from "./6.svg";
import fox7 from "./7.svg";
import fox8 from "./8.svg";
import fox9 from "./9.svg";
import fox10 from "./10.svg";

export const fox = {
	[Symbol.for("default")]: fox1,
	0: fox1,
	1: fox2,
	2: fox3,
	3: fox4,
	4: fox5,
	5: fox6,
	6: fox7,
	7: fox8,
	8: fox9,
	9: fox10,
};

export default fox[Symbol.for("default")];
