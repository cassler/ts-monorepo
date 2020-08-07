import React from 'react';
import { PartnerCode } from '../App';
import { ImpPayloadI } from './ImpPackage';
import DownloadButton from './DownloadButton';

interface ProvisioningButtonsProps {
	payload: ImpPayloadI,
	partner: PartnerCode,
	title?: string
}

export const ProvisioningButtons: React.FC<ProvisioningButtonsProps> =
	({ payload, partner, title }) => (
		<>
			{title && (<h4>{title}</h4>)}
			<div className="button-group-wf" style={{ display: "flex" }}>
				<DownloadButton
					label="eBiz Suite" type="primary" partner={partner}
					data={payload.eBizUpload} />
				<DownloadButton
					label="Finance Driver" type="primary" partner={partner}
					data={payload.financeDriverUpload} />
				<DownloadButton
					label="Product Subscript"
					type="primary" partner={partner}
					data={payload.prodSubAttachment}
				/>
			</div>
		</>
	)

export default ProvisioningButtons;