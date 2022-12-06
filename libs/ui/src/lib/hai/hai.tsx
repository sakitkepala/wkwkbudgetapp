export type HaiProps = {
  description?: string;
};

function Hai({ description }: HaiProps) {
  return (
    <div>
      <h1>
        Hai :* <button onClick={() => console.log('salam')}>salam</button>
      </h1>
      {description && <p>{description}</p>}
    </div>
  );
}

export { Hai };
