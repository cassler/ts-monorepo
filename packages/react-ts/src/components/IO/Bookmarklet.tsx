import React from 'react';
import { Button } from 'antd';

const bookmarkletURL = `javascript:(function()%7B%22use%20strict%22%3Bvar%20_slicedToArray%3Dfunction(e%2Ct)%7Bif(Array.isArray(e))return%20e%3Bif(Symbol.iterator%20in%20Object(e))return%20function(e%2Ct)%7Bvar%20r%3D%5B%5D%2Cn%3D!0%2Co%3D!1%2Ca%3Dvoid%200%3Btry%7Bfor(var%20i%2Cl%3De%5BSymbol.iterator%5D()%3B!(n%3D(i%3Dl.next()).done)%26%26(r.push(i.value)%2C!t%7C%7Cr.length!%3D%3Dt)%3Bn%3D!0)%3B%7Dcatch(e)%7Bo%3D!0%2Ca%3De%7Dfinally%7Btry%7B!n%26%26l.return%26%26l.return()%7Dfinally%7Bif(o)throw%20a%7D%7Dreturn%20r%7D(e%2Ct)%3Bthrow%20new%20TypeError(%22Invalid%20attempt%20to%20destructure%20non-iterable%20instance%22)%7D%3Bfunction%20_toConsumableArray(e)%7Bif(Array.isArray(e))%7Bfor(var%20t%3D0%2Cr%3DArray(e.length)%3Bt%3Ce.length%3Bt%2B%2B)r%5Bt%5D%3De%5Bt%5D%3Breturn%20r%7Dreturn%20Array.from(e)%7Dfunction%20onlyUnique(e%2Ct%2Cr)%7Breturn%20r.indexOf(e)%3D%3D%3Dt%7Dfunction%20copyToClipboard(e)%7Bvar%20t%3Ddocument.createElement(%22textarea%22)%3Bt.value%3De%2Ct.setAttribute(%22readonly%22%2C%22%22)%2Ct.style.position%3D%22absolute%22%2Ct.style.left%3D%22-9999px%22%2Cdocument.body.appendChild(t)%3Bvar%20r%3D0%3Cdocument.getSelection().rangeCount%26%26document.getSelection().getRangeAt(0)%3Bt.select()%2Cdocument.execCommand(%22copy%22)%2Cdocument.body.removeChild(t)%2Cr%26%26(document.getSelection().removeAllRanges()%2Cdocument.getSelection().addRange(r))%7Dvar%20rows%3D%5B%5D.concat(_toConsumableArray(document.getElementById(%22dealer.editable-list%22).getElementsByTagName(%22tr%22))).map(function(e)%7Bvar%20t%3De.innerText.split(%22%20-%20%22)%2Cr%3D_slicedToArray(t%2C2)%2Cn%3Dr%5B0%5D%2Co%3Dr%5B1%5D%3Breturn%20n%2B%22%2C%22%2Bo.substring(0%2Co.length-1).trim()%7D).filter(onlyUnique)%2CcsvString%3D%22EBIZ_ID%2CNAME%5Cn%22%2Brows.join(%22%2C%5Cn%22)%3BcopyToClipboard(csvString)%2Cconsole.log(%22Copied%20%22%2Brows.length%2B%22%20items%20to%20clipboard.%20Save%20this%20as%20a%20CSV.%22)%3B%7D)()`;

export function Bookmarklet() {
	return (
		<Button type='primary' href={bookmarkletURL}>Scrape eBiz (Drag me to bookmark bar)</Button>
	)
}

export default Bookmarklet;