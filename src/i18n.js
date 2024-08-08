import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
        "pastIssues": "Past Issues",
        "newIssue": "New Issue",
        "issueNumber": "Issue Number",
        "issueDate": "Issue Date",
        "title": "Title",
        "description": "Description",
        "image": "Image",
        "submit": "Submit",
        "cancel": "Cancel",
        "create": "Create",
        "delete": "Delete",
        "edit": "Edit",
        "noResult": "No results found for",
        "refresh": "Refresh",
        "success": "Success",
        "issueCreatedSuccessfully": "Issue created successfully",
        "issueDeletedSuccessfully": "Issue deleted successfully",
        "issueUpdatedSuccessfully": "Issue updated successfully",
        "updateIssue": "Update Issue",
        "enterIssueNumber": "Enter issue number",
        "enterIssueDate": "Enter issue date",
        "enterImageUri": "Enter image URI",
        "imageUri": "Image URI",
        "update": "Update",
        "errorFetchingIssues": "Error fetching issues",
    },
  },
  'zh-HK': {
    translation: {
        "pastIssues": "過往期刊",
        "newIssue": "新期刊",
        "issueNumber": "期號",
        "issueDate": "出版日期",
        "title": "標題",
        "description": "描述",
        "image": "圖片",
        "submit": "提交",
        "cancel": "取消",
        "create": "創建",
        "delete": "刪除",
        "edit": "編輯",
        "noResult": "找不到結果：",
        "refresh": "重新整理",
        "success": "成功",
        "issueCreatedSuccessfully": "成功創建期刊",
        "issueDeletedSuccessfully": "問題已成功刪除",
        "issueUpdatedSuccessfully": "問題已成功更新",
        "updateIssue": "更新期刊",
        "enterIssueNumber": "輸入期號",
        "enterIssueDate": "輸入出版日期",
        "enterImageUri": "輸入圖片網址",
        "imageUri": "圖片網址",
        "update": "更新",
        "errorFetchingIssues": "獲取問題時出錯"
      }
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-HK'],
    debug: false,
    interpolation: {
      escapeValue: false,
      },
    resources
  });



  export default i18n;