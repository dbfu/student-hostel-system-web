import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const SVG3 = () => (
  <svg
    style={{
      width: "1em",
      height: "1em",
      fill: "currentcolor",
      overflow: "hidden",
    }}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M477.04728007 930.47791389c-68.87620267 0-137.16909283-17.11280925-197.49704135-49.49069028-58.36611129-31.32303019-109.17128989-76.74334435-146.92122851-131.34878151-5.38952135-7.79611933-5.51643022-18.08150187-0.32018091-26.00802304 5.19624931-7.92884907 14.68059648-11.9142309 23.97865643-10.07930255 21.53130894 4.24501931 43.46895587 6.39663673 65.20401578 6.39663674 88.70996878 0 172.10725945-34.54463431 234.83016192-97.27102976 62.72290361-62.72756053 97.26637283-146.13067207 97.26637284-234.84762682 0-97.14994403-42.43739079-189.1630171-116.43066937-252.4459463-7.21164402-6.16727097-9.95937963-16.09405099-6.94501945-25.09288676s11.18654691-15.26740082 20.6592512-15.84605526c9.61940594-0.58796942 18.181632-0.87438563 26.17801045-0.87438563 56.47762432 0 111.27866368 11.066624 162.88138468 32.89249906 49.83182791 21.07723321 94.58034461 51.24644637 133.00324579 89.66818361 38.42406514 38.42290119 68.59444338 83.17258183 89.67400448 133.00557368 21.82820409 51.60621397 32.89599203 106.41191026 32.89599204 162.89652054 0 56.47413134-11.06778909 111.27284281-32.89715712 162.87672775-21.07839715 49.82950002-51.24877539 94.57685163-89.67284054 132.99975282s-83.17258183 68.59211435-133.00324579 89.67167659C588.32594375 919.4101248 533.52374045 930.47791389 477.04728007 930.47791389zM205.69434681 766.18773163c27.73001557 29.56377998 60.21966848 54.62639502 95.87853312 73.76274887 53.57969408 28.7545947 114.25809522 43.95446727 175.47440014 43.95446727 99.32601117 0 192.71178809-38.6848677 262.95487374-108.92795222 70.2442496-70.24075662 108.92911616-163.62304057 108.92911616-262.9443948 0-99.33765405-38.6848677-192.72925298-108.92911616-262.97117355-62.65537422-62.65537422-143.73338795-100.2003968-231.01360242-107.57737017 58.48254009 68.18926819 91.17128818 155.28552448 91.17128818 246.3438757 0 101.15511865-39.38693689 196.25357426-110.90608924 267.77738354-71.51915235 71.52380928-166.61295104 110.9130752-267.76224768 110.9130752C216.23354595 766.51955541 210.96511033 766.40894749 205.69434681 766.18773163z"></path>
  </svg>
);

export const Icon3 = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SVG3} {...props} />
);
