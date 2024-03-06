import { notification } from "antd";

const Notification = (props) => {
  notification.success({
    message: props.messageName,
    description: props.descriptionName,
    duration: props.durationTime,
  });

  return null;
};

export default Notification;
