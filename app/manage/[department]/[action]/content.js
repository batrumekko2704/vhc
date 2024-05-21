import ImportRead from "@/app/manage/[department]/[action]/import/read";
import ImportTable from "@/app/manage/[department]/[action]/import/table";
import FinanceRead from "@/app/manage/[department]/[action]/finance/read";
import FinanceTable from "@/app/manage/[department]/[action]/finance/table";

export default function Content({department, action}) {
    if (department === 'import') {
        if (action === 'read') {
            return <ImportRead/>;
        } else if (action === 'table') {
            return <ImportTable/>
        }
    } else if (department === 'finance') {
        if (action === 'read') {
            return <FinanceRead/>;
        } else if (action === 'table') {
            return <FinanceTable/>;
        }
    }
}