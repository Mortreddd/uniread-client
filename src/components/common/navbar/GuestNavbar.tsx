import {Fragment, useRef} from "react";
import { Button } from "../form/Button";
import LoginModal from "../modal/auth/LoginModal";
import {ModalRef} from "@/components/common/modal/Modal.tsx";

export default function GuestNavbar() {
  const loginModalRef = useRef<ModalRef>(null);

  function handleLoginModal() {
      loginModalRef.current?.open();
  }

  return (
    <Fragment>
      <div className="w-auto h-fit flex justify-end items-center gap-3 md:gap-5">
        <Button
          onClick={handleLoginModal}
          variant={"primary"}
        >
          Login
        </Button>
      </div>
      {/* The login modal */}
      <LoginModal ref={loginModalRef}/>
    </Fragment>
  );
}
