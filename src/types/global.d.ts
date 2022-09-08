export {}

declare global {

    type Order = {
        id: string,
        type: string,
        customerName: string,
        createdDate: Date,
        createdbyUsername: string
      }

    interface tableProps {
        rows: any[],
        onSelectChange: (list: string[]) => void;
    }

    interface menuProps {
        onSearchChange: (text: string) => void;
        onFilterChange: (text: string) => void;
        onDeleteClick:  () => void;
    }
}