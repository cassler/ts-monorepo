import { asEbizPayload, asProdSubPayload, asFinanceDriverPayload, toDTSimple } from '@wf/core';
import { DTReportItem, SimpleAccount, PartnerCode, partnerConfigInput, EnrollmentPhase } from '@wf/types';




export interface ImplementionPreChecks {
	accountStatusOK: boolean,
	notImplemented: boolean,
	enrollmentStatusOK: boolean,
	partnerStatusOK: boolean,
}

export type ImplementationResult = {
	pid?: any,
	checks: ImplementionPreChecks,
	account?: SimpleAccount
	original?: any,
	notes?: string
}

export interface ImplementationPackage {
	title: string,
	message: string,
	desc?: string,
	items: ImplementationResult[],
	type?: "info" | "success" | "warning" | "error" | undefined,
	status?: "success" | "processing" | "default" | "error" | "warning"

}

export type ImpPayload = {
	cancel: ImplementationPackage,
	implement: ImplementationPackage,
	unmatched: ImplementationPackage,
	invalid: ImplementationPackage,
	provisioning: {
		eBizUpload: any[],
		financeDriverUpload: any[],
		prodSubAttachment: any[]
	}
}

/**
 * Returns implementation data for a given partner
 *
 * @remarks
 * WF is entirely self contained, though we really should be accepting
 * the entire config object as an argument.
 *
 * @todo option to pass config object at runtime
 * @todo extract file-processing logic
 *
 * @beta
 *
 */
export class Workflower {

	props: {
		partnerCode: PartnerCode,
		options: partnerConfigInput,
		requested: any[],
		reference: any[]
	}
	config: partnerConfigInput
	partner: PartnerCode
	requestData: object[]
	refData: DTReportItem[]
	refQuick: SimpleAccount[]
	excluded: any[]
	init: any[]
	implement: ImplementationResult[]
	stream: object[]

	constructor(props) {
		this.props = props;
		this.partner = props.partnerCode;
		this.config = props.options;
		this.requestData = props.requested;
		this.refData = props.reference;
		this.refQuick = this.simpleAccounts(this.refData);
		this.excluded = props.options.live_ids;
		this.init = this.matchResult();
		this.implement = this.itemsToImplement.items;
		this.stream = [{}];
	}

	// helper function to fill in the matchResult array
	private emptySimpleAccount(partnerID: any, meetRequirements: boolean = false): SimpleAccount {
		return {
			partnerID: partnerID,
			dealertrackID: 0,
			enrollment: null,
			dbaName: null,
			legalName: null,
			city: null,
			state: null,
			zip: null,
			phone: null,
			fax: null,
		}
	}

	// create a smaller version of references
	simpleAccounts(data: DTReportItem[]): SimpleAccount[] {
		let out = [];
		for (const d of data) {
			out.push(toDTSimple(d))
		}
		return out;
		// return data.map(i => toDTSimple(i))
	}

	/**
	 * Returns account infromation from a partnerID using config
	 *
	 * @param partnerID
	 * @param fast
	 */

	findAccount(partnerID: any, fast: boolean = true) {
		if (fast) {
			return this.refQuick.find(i => i.partnerID === partnerID)
		}
		return this.refData.find(i => i["Lender Dealer Id"] === partnerID)
	}

	/**
	 * Returns the test results object for a given partnerID
	 * @param partnerID
	 * @param showOriginal
	 */

	findResult(partnerID: any, showOriginal: boolean = false) {
		let result = this.matchResult().find(i => i.pid === partnerID);
		if (!showOriginal) return {
			pid: result.pid,
			checks: result.checks
		}
		return result;
	}


	query(terms: string | number) {
		if (typeof terms === 'string') {
			let search = this.matchResult().filter(item => item.account.dbaName?.includes(terms))
			return search;
		}
		if (typeof terms === 'number') {
			let search = this.matchResult().filter(item => item.pid === terms || item.account.dealertrackID === terms)
			return search;
		}
	}


	/**
	 * Find if a given account ID is part of the exclusion set
	 *
	 * @param pid unique ID to be checked for exclusion
	 * @param account - optional - explicitly define an account object
	 * @yield boolean
	 */
	isExcluded(pid: any, account?: SimpleAccount) {
		const matched: SimpleAccount = account ? account : this.findAccount(pid, false) as SimpleAccount;
		return (
			this.config.live_ids.includes(pid) ||
			this.config.live_ids.includes(matched?.partnerID) ||
			this.config.live_ids.includes(matched?.dealertrackID)
		)
	}

	/**
	 * Augument each item from request with account information
	 * where available, as well as compute multiple property flags
	 * to be used by the application.
	 *
	 *
	 */
	matchResult(): ImplementationResult[] {
		let result = [];

		// Filter out our results immediately
		let validRequests = this.requestData.filter(i => {
			return this.config.custom_validation(i)
		})

		for (const req of this.requestData) {
			let pid = req[this.config.internal_id];
			let account = this.findAccount(pid, true) as SimpleAccount;
			let accObject = account ? account : this.emptySimpleAccount(pid);
			result.push({
				pid,
				checks: {
					accountStatusOK: account ? true : false,
					notImplemented: !this.isExcluded(pid, accObject),
					enrollmentStatusOK: account ? this.config.valid_phases.includes(account.enrollment as EnrollmentPhase) : false,
					partnerStatusOK: this.config.custom_validation(req),
				},
				account: accObject,
				original: req,
			})

		}
		return result;
	}

	randomStr(len: number = 8, chars: string = '1234567890abcdef'): string {
		var ans = '';
		for (var i = len; i > 0; i--) {
			ans +=
				chars[Math.floor(Math.random() * chars.length)];
		}
		return ans;
	}

	streamData(callback?: Function): void {
		for (const req of this.requestData) {
			let pid = req[this.config.internal_id];
			let account = this.findAccount(pid, true) as SimpleAccount;
			let accObject = account ? account : this.emptySimpleAccount(pid);
			this.stream = [
				...this.stream,
				{
					pid,
					checks: {
						accountStatusOK: account ? true : false,
						notImplemented: !this.isExcluded(pid, accObject),
						enrollmentStatusOK: account ? this.config.valid_phases.includes(account.enrollment as EnrollmentPhase) : false,
						partnerStatusOK: this.config.custom_validation(req),
					},
					account: accObject,
					original: req,
				},
			];
			// console.log(this.stream)
			callback && callback(this.stream);
		}
	}

	// same as matchResult, but with reduced data and added notations
	get notedResults() {
		return this.matchResult().map(item => ({
			pid: item.pid,
			checks: item.checks,
			notes: this.getResultComment(item),
			account: item.account,
			original: item.original,
		}))
	}

	getResultComment(item: ImplementationResult) {
		if (!item.account || item.account.dealertrackID === 0) {
			return 'No Dealertrack account found'
		}
		if (item.account && !this.config.valid_phases.includes(item.account.enrollment as EnrollmentPhase)) {
			return `Invalid enrollment for the account (${item.account.enrollment})`
		}
		if (!this.config.custom_validation(item.original)) {
			return `Dealer does not meet partner requirements from config.`
		}
		if (this.config.live_ids.includes(item.pid)) {
			return `Dealer is already live, skipped.`
		}
		return `ADDED ${item.pid} - New and OK for implementation`
	}

	eBizUpload(accounts: any[]) {
		return asEbizPayload(accounts, this.partner, this.config)
	}

	financeDriverUpload(accounts: any[]) {
		return asFinanceDriverPayload(accounts, this.partner, this.config);
	}

	prodSubRequest(accounts: any[]) {
		return asProdSubPayload(accounts, this.partner, this.config);
	}

	get summary() {
		return {
			timestamp: Date.now(),
			partner: this.partner,
			inputFile: this.config.submitted_file,
			reportFile: this.config.dt_report_file,
			countLive: this.config.live_ids.length,
			countSubmitted: this.requestData.length,
		}
	}

	get explanation() {
		let detail = this.summary;
		let str: string;
		str = `\n\n------------------\n` +
			`We are comparing information about ${this.matchResult().length} items\n` +
			`from ${this.partner} found in "${this.config.submitted_file} with\n` +
			`the Dealertrack report called "${this.config.dt_report_file}.\n` +
			`-------------\n` +
			`These items can be configured in partnerSetting.json\n` +
			`-------------\n` +
			`- ${detail.countLive} items are already live.\n` +
			`- add results to eBiz Profile: ${this.config.ebiz_profile}\n` +
			`- Config sample: ${this.config.crm} | ${this.config.leads} \n` +
			`- Using rules described on SharePoint...\n\n\n -More Info at:\n` +
			this.config.reference_doc

		return str;

	}


	/**
	 * @method invalidEnrollment
	 * @method unmatchedRequests
	 * @method itemsToImplement
	 * @method itemsToCancel - return a manifest of items that should be cancelled
	 */

	get invalidEnrollment(): ImplementationPackage {
		return {
			title: "Bad DT Enrollment",
			message: "These items do not have valid Dealertrack enrollment.",
			desc: "This account does not meet partner requirements for DT Enrollment. Confirm the DT account is not mis-matched. If the account is properly matched then reach out to ADM (admrequestes@dealertrack.com) and ask that they set the account to 'Prospect'.",
			items: this.notedResults.filter(i => i.checks.partnerStatusOK && !i.checks.enrollmentStatusOK),
			type: "warning",
			status: "warning",
		}
	}
	get unmatchedRequests(): ImplementationPackage {
		return {
			title: "No Matched Account",
			message: "These items were requested but do not exist in DT",
			desc: `The partner may not have added these dealers to their DT partner file yet. Wait 24 hours to see if a match takes place. If you continue to receive this error, reach out to the partner to confirm they have properly added the dealer to their DT partner file.`,
			items: this.notedResults.filter(i => i.checks.partnerStatusOK && i.account.dealertrackID < 1),
			type: "error",
			status: "error"
		}
	}

	get itemsToImplement(): ImplementationPackage {
		return {
			title: 'Ready!',
			message: 'These items are new and have passed pre-qualifications',
			desc: `These are the dealers that are ready to implement for the partner according to the provided data and selected partner settings. Check the results to make sure they correspond to what's expected. You can then download pre-formatted files for provisioning the dealer for billing, finance forms and lead routing.`,
			items: this.notedResults.filter(i => Object.values(i.checks).every(v => v === true)),
			type: "success",
			status: "success",
		}
	}

	get itemsToCancel(): ImplementationPackage {
		return {
			title: 'Pending Cancellations',
			message: 'These items are listed as inactive by partner by are live.',
			desc: `These dealers are listed as being live do not meet partner requirements. Do NOT process cancellations for dealers who are listed as 'Not Contacted' or 'No DT account found'. Follow the steps above for dealers in these buckets.`,
			items: this.notedResults.filter(i => !i.checks.partnerStatusOK && !i.checks.notImplemented),
			type: "info",
			status: "processing",
		}
	}

	get provisioning() {
		let accounts = this.implement.map(i => i.account);
		return {
			eBizUpload: this.eBizUpload(accounts),
			financeDriverUpload: this.financeDriverUpload(accounts),
			prodSubAttachment: this.prodSubRequest(accounts)
		}
	}

	get fullPayload(): ImpPayload {
		return {
			implement: this.itemsToImplement,
			unmatched: this.unmatchedRequests,
			invalid: this.invalidEnrollment,
			cancel: this.itemsToCancel,
			provisioning: this.provisioning,
		}
	}

	get howMany() {
		return this.implement.length;
	}

}



