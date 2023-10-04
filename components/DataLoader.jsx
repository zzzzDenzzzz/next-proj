import { Dimmer, Loader } from "semantic-ui-react";

const DataLoader = () => {
  return (
    <Dimmer active inverted>
      <Loader active inline size="huge">
        Loading...
      </Loader>
    </Dimmer>
  );
};

export default DataLoader;
