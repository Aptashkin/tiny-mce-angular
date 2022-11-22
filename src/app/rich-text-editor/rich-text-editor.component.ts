import 'tinymce/tinymce.min';
import 'tinymce/themes/silver/theme.js';
import 'tinymce/models/dom/model.js';
import 'tinymce/icons/default/icons.js';

import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/image/plugin.js';
import 'tinymce/plugins/table/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';

import { Editor as TinyMCEEditor, TinyMCE } from 'tinymce';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, inject, Input, NgZone, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var tinymce: any;

type EditorOptions = Parameters<TinyMCE['init']>[0];

const getTinymce = () => {
	const w = typeof window !== 'undefined' ? (window as any) : undefined;
	return w && w.tinymce ? w.tinymce : null;
};

const listenTinyMCEEvent = (
	editor: any,
	eventName: string,
	destroy$: Subject<void>
) => fromEvent(editor as HasEventTargetAddRemove<unknown> | ArrayLike<HasEventTargetAddRemove<unknown>>, eventName).pipe(takeUntil(destroy$));

@Component({
	selector: 'app-rich-text-editor[init]',
	templateUrl: './rich-text-editor.component.html',
	styleUrls: ['./rich-text-editor.component.css'],
	styles: [ ':host { display: block; }' ],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RichTextEditorComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
	
	private __ngZone = inject(NgZone);

	protected _elementId = "rich-text-editor-id";

	private __tinyCloudUrl = "https://cdn.tiny.cloud/1/no-api-key/tinymce/6.2.0-10";

	private __editor: TinyMCEEditor | undefined;

	private __destroy$ = new Subject<void>();

	@Input() init!: EditorOptions | undefined;
	@Input() initialValue: string | undefined;
	@Input() plugins: string | undefined;
	@Input() toolbar: string | string[] | null = null;
	@Input() modelEvents = 'change input undo redo';

	private onTouchedCallback = () => {};
	private onChangeCallback = (x: any) => {};

	ngAfterViewInit() {
		this.__initialise();
	}

	ngOnDestroy() {
		this.__destroy$.next();

		if (getTinymce() !== null) {
			getTinymce().remove(this.__editor);
		}
		tinymce.remove(this.__editor);
	}

	writeValue(value: string | null): void {
		this.initialValue = value || this.initialValue;

		if (this.__editor && this.__editor.initialized && typeof value === 'string') {
			this.__editor.setContent(value);
		}
	}

	registerOnChange(fn: (_: any) => void): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	private __initEditor(editor: any) {
		listenTinyMCEEvent(editor, 'blur', this.__destroy$).subscribe(() => {
			this.__ngZone.run(() => this.onTouchedCallback());
		});

		listenTinyMCEEvent(editor, this.modelEvents, this.__destroy$).subscribe(() => {
			this.__ngZone.run(() => this.__emitOnChange(editor));
		});

		if (typeof this.initialValue === 'string') {
			this.__ngZone.run(() => {
				editor.setContent(this.initialValue as string);
				if (editor.getContent() !== this.initialValue) {
					this.__emitOnChange(editor);
				}
			});
		}
	}

	__initialise() {
		const finalInit = {
			...this.init,
			selector: '#' + this._elementId,
			plugins: this.plugins || (this.init && this.init.plugins),
			toolbar: this.toolbar || (this.init && this.init.toolbar),
			skin_url: `${ this.__tinyCloudUrl }/skins/ui/oxide`,
			content_css: `${ this.__tinyCloudUrl }/skins/ui/oxide/content.min.css`,
			setup: (editor: any) => {
				this.__editor = editor;

				listenTinyMCEEvent(editor, 'init', this.__destroy$).subscribe(() => {
					this.__initEditor(editor);
				});

				if (this.init && typeof this.init.setup === 'function') {
					this.init.setup(editor);
				}
			},
		};

		this.__ngZone.runOutsideAngular(() => {
			getTinymce().init(finalInit);
		});
	}

	private __emitOnChange(editor: TinyMCEEditor) {
		if (this.onChangeCallback) {
			this.onChangeCallback(editor.getContent({ format: 'html' }));
		}
	}

}
