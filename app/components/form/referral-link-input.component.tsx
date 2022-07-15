import { IoCopy } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import InputSideButtonComponent from '~/components/form/input-side-button.component';
import InputComponent from '~/components/form/input.component';

export default function ReferralLinkIComponent({ link }: { link: string; }) {

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      const input = document.createElement('input');
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }

    toast.success('Referral link copied!');
  }

  return (
    <div className="flex items-center gap-dimen-sm">
      <InputComponent 
        disabled 
        label=""
        name=""
        value={link} 
        id="referral-link-input"
      />
      <InputSideButtonComponent Icon={IoCopy} text="Copy" action={copyLink} />

      <ToastContainer />
    </div>
  );
}
