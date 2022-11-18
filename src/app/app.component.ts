import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(EditorComponent) private readonly _editor?: EditorComponent;

  protected _config = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table autoresize',
    toolbar_sticky: true,
    menubar: false,
    branding: false,
    toolbar: 'bold italic underline blockquote numlist bullist outdent indent styles | alignment | removeformat | link image table',
    toolbar_groups: {
      alignment: {
        icon: 'align-left',
        tooltip: 'Formatting',
        items: 'alignleft aligncenter alignright alignjustify'
      }
    },
    table_header_type: 'section',
    content_style: 'img { width: 100% }'
  };

  protected _formControl = new FormControl("<h1><strong>Heading</strong></h1>\n" +
      "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n" +
      "<p>&nbsp;</p>\n" +
      "<h2>Heading 2</h2>\n" +
      "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n" +
      "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n" +
      "<p><img src=\"data:image/jpeg;base64,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\"></p>\n" +
      "<p>&nbsp;</p>\n" +
      "<blockquote>\n" +
      "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n" +
      "</blockquote>\n" +
      "<p>&nbsp;</p>\n" +
      "<p style=\"padding-left: 80px;\">intend test</p>\n" +
      "<p style=\"padding-left: 80px;\">&nbsp;</p>\n" +
      "<h3 style=\"text-align: center;\"><em>Centred italic</em></h3>\n" +
      "<p><a title=\"TinyMCE docs\" href=\"https://www.tiny.cloud/docs/\" target=\"_blank\" rel=\"noopener\">TinyMCE docs</a></p>\n" +
      "<table style=\"border-collapse: collapse; width: 100%; border-width: 1px; margin-left: auto; margin-right: auto;\" border=\"1\"><colgroup><col style=\"width: 50%;\"><col style=\"width: 50%;\"></colgroup>\n" +
      "<thead>\n" +
      "<tr style=\"text-align: center;\">\n" +
      "<td style=\"border-width: 1px;\">Header 1</td>\n" +
      "<td style=\"border-width: 1px;\">Header 2</td>\n" +
      "</tr>\n" +
      "</thead>\n" +
      "<tbody>\n" +
      "<tr>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "</tr>\n" +
      "<tr>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "<td style=\"border-width: 1px;\">text</td>\n" +
      "</tr>\n" +
      "</tbody>\n" +
      "</table>");

}
