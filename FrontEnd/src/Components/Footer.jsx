import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright,faEnvelope,faHome } from '@fortawesome/fontawesome-free-solid'

import style from "./Footer.module.css";

export default function () {
  return (
    <div>

 

{/* **Black Footer** */}


      <div className={style.footerBottom}>
      <div>
<a className={style.copyRight}><FontAwesomeIcon icon={faCopyright} /> 2024Turners</a> 
        </div>
    

     
        <a><FontAwesomeIcon icon={faHome} />Branch Details</a>
     
        <a><FontAwesomeIcon icon={faEnvelope} /> News Letter</a>
        <a><FontAwesomeIcon icon={faEnvelope} /> Email Alert</a>
       
      </div>
    </div>
  );
}
