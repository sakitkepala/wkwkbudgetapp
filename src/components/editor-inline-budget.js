import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Portal,
  Input,
  PopoverFooter,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { client } from "../utils";
import { useMutation, useQueryClient } from "react-query";

function EditorInlineBudget({ line, ml, mr }) {
  const queryClient = useQueryClient();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [inputBudget, setInputBudget] = React.useState(line.dianggarkan);
  const { mutate } = useMutation(
    async (dataBaruLine) => {
      try {
        const respon = await client(`/budget-line/${dataBaruLine.id}`, {
          method: "PUT",
          data: dataBaruLine,
        });
        return respon.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      onSuccess: (dataBaruLine) => {
        queryClient.invalidateQueries(["budget", "latest"]);
        queryClient.invalidateQueries([
          "budget-lines",
          `budget-${dataBaruLine.budgetId}`,
        ]);
      },
    }
  );

  const initialFocusRef = React.useRef();

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    setInputBudget(line.dianggarkan);
  }, [isOpen, line.dianggarkan]);

  const onSubmitBudget = (ev) => {
    if (inputBudget !== line.dianggarkan) {
      mutate({ id: line.id, dianggarkan: inputBudget });
    }
    onClose();
  };

  return (
    <Popover
      placement="top"
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button size="xs" ml={ml}>
          <EditIcon />
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverContent p="2" pt="6" bgColor="gray.200">
          <PopoverArrow bgColor="gray.200" />
          <PopoverBody>
            <Input
              ref={initialFocusRef}
              placeholder="misalnya... 1 000 000,00"
              bgColor="gray.100"
              value={inputBudget}
              onChange={(ev) => {
                const formattedInput = Number(ev.target.value);
                setInputBudget(formattedInput);
              }}
            />
          </PopoverBody>

          <PopoverFooter>
            <Button size="sm" colorScheme="green" onClick={onSubmitBudget}>
              Simpan
            </Button>
          </PopoverFooter>
          <PopoverCloseButton />
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export { EditorInlineBudget };
