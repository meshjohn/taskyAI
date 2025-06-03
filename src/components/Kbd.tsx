type KdbProps = {
  kdbList: string[];
};
const Kbd: React.FC<KdbProps> = ({ kdbList }) => {
  return (
    <div className="space-x-1">
      <div className='sr-only'>keyboard shortcut is, </div>
      {kdbList.map((item, index) => (
        <kbd
          key={index}
          className='inline-block px-1 py-0.5 bg-background/10 rounded-full'
        >
          {item}
        </kbd>
      ))}
    </div>
  );
};

export default Kbd;
