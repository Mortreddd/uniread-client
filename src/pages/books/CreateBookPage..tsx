import Navbar from "@/components/common/navbar/Navbar.tsx";
import {Input} from "@/components/common/form/Input.tsx";
import TextArea from "@/components/common/form/TextArea.tsx";


export default function CreateBookPage(){

    return(
        <main className={'w-full h-screen antialiased'}>
            <div className={'w-full'}>
                <Navbar />
            </div>

            <div className={"w-full h-[80dvh] flex justify-center items-center"}>
                <form className={'w-1/2 px-5 py-3 '}>
                    <h1 className={'text-3xl font-sans mb-4 font-bold'}>
                        Details of your new story
                    </h1>
                    <div className={'w-full relative'}>
                        <label className={'block text-xl mb-2 font-sans font-semibold text-gray-600'}>
                            Title
                        </label>
                        <Input variant={'primary'} inputSize={'lg'} className={'w-full block'}/>
                    </div>
                    <div className={'w-full relative'}>
                        <label className={'block text-xl mb-2 font-sans font-semibold text-gray-600'}>
                            Synopsis
                        </label>
                        <TextArea></TextArea>
                    </div>
                </form>
            </div>
        </main>
    )
}