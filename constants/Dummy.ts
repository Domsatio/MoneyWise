interface TransactionProps {
  name: string;
  amount: number;
  desc: string;
  date: string;
}

const Transaction: TransactionProps[] = [
  { name: "Housing", 
    amount: 1500, 
    desc: "Rent and utilities", 
    date: "Today" 
},
  {
    name: "Food",
    amount: 600,
    desc: "Groceries and dining",
    date: "Yesterday",
  },
  {
    name: "Transportation",
    amount: 400,
    desc: "Public transit and gas",
    date: "2 days ago",
  },
  {
    name: "Entertainment",
    amount: 500,
    desc: "Movies and games",
    date: "3 days ago",
  },
  {
    name: "Shopping",
    amount: -300,
    desc: "Clothing and gadgets",
    date: "4 days ago",
  },
  {
    name: "Health",
    amount: -200,
    desc: "Medications and checkups",
    date: "5 days ago",
  },
  {
    name: "Miscellaneous",
    amount: -100,
    desc: "Random expenses",
    date: "6 days ago",
  },
];


export { Transaction };