import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Buyin } from "./model";

type Props = {
  buyins: Buyin[];
};
const BuyinTable = ({ buyins }: Props) => {
  return (
    <div dir="rtl" lang="he" className="font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">משתמש</TableHead>
            <TableHead className="text-left">סכום</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buyins.map((buyin) => (
            <TableRow key={buyin.id}>
              <TableCell className="font-medium text-right">
                {buyin.player.name}
              </TableCell>
              <TableCell className="text-left">{buyin.amount} ₪</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyinTable;
