import { Child, ExpandedChildData } from "../types";

export function decodeHTML(html: string) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

export async function expandPostData(post: Child): Promise<Child> {
	const postData = post.data;

	// Find gender in title
	const genderRegex = /\[([FM]+)4([FMA]+)\]/i;
	const genderMatch = postData.title.match(genderRegex);
	const gender = genderMatch
		? genderMatch[1].toLowerCase() === "f"
			? "F"
			: "M"
		: null;

	// Cleaned title
	const cleanedTitle = decodeHTML(
		postData.title.replace(genderRegex, "").trim()
	);

	const expandedChildData: ExpandedChildData = {
		...postData,
		cleanedTitle,
		madeByGender: gender,
		selftext_html: postData.selftext_html
			? decodeHTML(postData.selftext_html)
			: undefined,
	};

	return {
		...post,
		data: expandedChildData,
	};
}
